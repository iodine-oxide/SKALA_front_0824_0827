import axios from 'axios'

const SGIS_AUTH_URL = 'https://sgisapi.mods.go.kr/OpenAPI3/auth/authentication.json'
const SGIS_GEOCODE_URL = 'https://sgisapi.mods.go.kr/OpenAPI3/addr/geocodewgs84.json'
const TOKEN_EXPIRY_MARGIN = 60_000

let tokenCache = {
  accessToken: '',
  expiresAt: 0,
}

const getSgisCredentials = () => ({
  consumerKey: import.meta.env.VITE_SGIS_CONSUMER_KEY?.trim(),
  consumerSecret: import.meta.env.VITE_SGIS_CONSUMER_SECRET?.trim(),
})

const getApiErrorMessage = (error, apiName) => {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : `${apiName} 요청 중 알 수 없는 오류가 발생했습니다.`
  }

  const responseMessage = error.response?.data?.errMsg ?? error.response?.data?.message
  if (responseMessage) return responseMessage

  if (!error.response) {
    return `${apiName}에 연결하지 못했습니다. 네트워크 상태 또는 브라우저의 CORS 차단 여부를 확인해 주세요.`
  }

  return `${apiName} 요청에 실패했습니다. 잠시 후 다시 시도해 주세요.`
}

const requireCredentials = () => {
  const credentials = getSgisCredentials()

  if (!credentials.consumerKey || !credentials.consumerSecret) {
    throw new Error('.env.local에 VITE_SGIS_CONSUMER_KEY와 VITE_SGIS_CONSUMER_SECRET을 입력해 주세요.')
  }

  return credentials
}

const getAccessToken = async (forceRefresh = false) => {
  const now = Date.now()

  if (!forceRefresh && tokenCache.accessToken && tokenCache.expiresAt - TOKEN_EXPIRY_MARGIN > now) {
    return tokenCache.accessToken
  }

  const { consumerKey, consumerSecret } = requireCredentials()

  try {
    const { data } = await axios.get(SGIS_AUTH_URL, {
      params: {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
      },
    })

    if (Number(data?.errCd) !== 0 || !data?.result?.accessToken) {
      throw new Error(data?.errMsg || 'SGIS 인증 토큰을 발급받지 못했습니다.')
    }

    const rawExpiry = Number(data.result.accessTimeout)
    const expiresAt = rawExpiry > 1_000_000_000_000 ? rawExpiry : rawExpiry * 1000

    tokenCache = {
      accessToken: data.result.accessToken,
      expiresAt: Number.isFinite(expiresAt) ? expiresAt : now + 3_600_000,
    }

    return tokenCache.accessToken
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'SGIS 인증 API'), { cause: error })
  }
}

const requestGeocode = async (address, accessToken) => {
  try {
    const { data } = await axios.get(SGIS_GEOCODE_URL, {
      params: {
        accessToken,
        address,
        resultcount: 20,
      },
    })

    return data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'SGIS 주소 검색 API'), { cause: error })
  }
}

const createLocationId = (adminCode, latitude, longitude) => {
  const rawId = adminCode || `${latitude}-${longitude}`
  return `sgis-${String(rawId).replace(/[^a-zA-Z0-9_-]/g, '-')}`
}

const normalizeSgisText = (value) => {
  if (value === null || value === undefined) return ''

  const text = String(value).trim()
  return ['null', 'undefined'].includes(text.toLowerCase()) ? '' : text
}

const normalizeLocation = (item, fallbackName) => {
  const latitudeText = normalizeSgisText(item.y)
  const longitudeText = normalizeSgisText(item.x)
  const latitude = latitudeText ? Number(latitudeText) : Number.NaN
  const longitude = longitudeText ? Number(longitudeText) : Number.NaN

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null

  const enteredName = normalizeSgisText(fallbackName)
  const sidoName = normalizeSgisText(item.sido_nm)
  const sggName = normalizeSgisText(item.sgg_nm)
  const finalAreaName = normalizeSgisText(item.ri_nm) || normalizeSgisText(item.adm_nm) || normalizeSgisText(item.leg_nm)
  const name = finalAreaName || enteredName
  const fullNameParts = finalAreaName ? [sidoName, sggName, finalAreaName].filter(Boolean) : [enteredName]
  const fullName = [...new Set(fullNameParts)].join(' ') || name
  const finalAreaCode = normalizeSgisText(item.ri_cd) || normalizeSgisText(item.adm_cd) || normalizeSgisText(item.leg_cd)
  const adminCodeParts = [normalizeSgisText(item.sido_cd), normalizeSgisText(item.sgg_cd), finalAreaCode].filter(Boolean)
  const adminCode = adminCodeParts.join('-')

  return {
    id: createLocationId(adminCode, latitude, longitude),
    adminCode,
    name,
    fullName,
    latitude,
    longitude,
  }
}

export const searchSgisLocations = async (query) => {
  const address = query.trim()
  if (!address) return []

  let accessToken = await getAccessToken()
  let data = await requestGeocode(address, accessToken)

  if (Number(data?.errCd) === -401) {
    accessToken = await getAccessToken(true)
    data = await requestGeocode(address, accessToken)
  }

  if (Number(data?.errCd) === -100) return []

  if (Number(data?.errCd) !== 0) {
    throw new Error(data?.errMsg || 'SGIS에서 주소를 검색하지 못했습니다.')
  }

  const resultData = Array.isArray(data?.result?.resultdata) ? data.result.resultdata : []

  const locations = resultData.map((item) => normalizeLocation(item, address)).filter(Boolean)

  return locations.filter((location, index) => locations.findIndex((candidate) => candidate.id === location.id) === index)
}
