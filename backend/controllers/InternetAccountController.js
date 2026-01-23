const internetAccountService = require('../services/InternetAccountService')

const ALLOWED_IMAGE_SUFFIXS = ['jpg', 'jpeg', 'png', 'gif', 'webp']
const ALLOWED_IMAGE_SIZE = 2 * 1024 * 1024
const ALLOWED_IMAGE_BASE64_SIZE = Math.floor(ALLOWED_IMAGE_SIZE * 1.33 * 1.1)

function createInternetAccount(req, resp) {
    const {platformName, account, platformIcon} = req.body
    if (platformName === undefined || platformName === null ||
        account === undefined || account == null ||
        platformIcon === undefined || platformIcon === null ||
        typeof platformName !== 'string' || typeof account !== 'string' || typeof platformIcon !== 'string' ||
        !platformName.trim() || !account.trim()) {
        return resp.fail('参数错误，请检查输入的参数是否合法、完整。')
    }
    if (platformIcon) {
        const regexStr = `^data:image\\/(${ALLOWED_IMAGE_SUFFIXS.join('|')});base64,(.+)$`
        const matchResult = platformIcon.match(new RegExp(regexStr))
        if (!matchResult) return resp.fail(`仅支持上传 ${ALLOWED_IMAGE_SUFFIXS.join('、').toUpperCase()} 格式的图片`)
        const base64Data = matchResult[2]
        if (!/^[A-Za-z0-9+/=]+$/.test(base64Data)) return resp.fail('请上传合法的图片文件')
        if (base64Data.length > ALLOWED_IMAGE_BASE64_SIZE) return resp.fail(`仅支持 ${ALLOWED_IMAGE_BASE64_SIZE} 字符及以下的 Base64 编码图片，当前编码长度已超出限制`)
        const data = Buffer.from(base64Data, 'base64')
        const isJPG = data.length >= 3 && data[0] === 0xFF && data[1] === 0xD8 && data[2] === 0xFF
        const isPNG = data.length >= 8 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4E && data[3] === 0x47 && data[4] === 0x0D && data[5] === 0x0A && data[6] === 0x1A && data[7] === 0x0A
        const isGIF = data.length >= 6 && data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x38 && (data[4] === 0x37 || data[4] === 0x39) && data[5] === 0x61
        const isWebP = data.length >= 12 && data[0] === 0x52 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x46 && data[8] === 0x57 && data[9] === 0x45 && data[10] === 0x42 && data[11] === 0x50
        if (!(isJPG || isPNG || isGIF || isWebP)) return resp.fail(`仅支持上传 ${ALLOWED_IMAGE_SUFFIXS.join('、').toUpperCase()} 格式的图片`)
        if (data.length > ALLOWED_IMAGE_SIZE) return resp.fail(`仅支持上传 ${ALLOWED_IMAGE_SIZE / 1024 / 1024} MB 及以下的图片`)
    }
    try {
        internetAccountService.createInternetAccount(platformName.trim(), account.trim(), platformIcon)
        return resp.success(null)
    } catch (err) {
        return resp.fail(err.message)
    }
}

function listInternetAccounts(req, resp) {
    return resp.success(internetAccountService.listInternetAccounts())
}

function deleteInternetAccountById(req, resp) {
    try {
        internetAccountService.deleteInternetAccountById(req.params.id)
        return resp.success(null)
    } catch (err) {
        return resp.fail(err.message)
    }
}

module.exports = {
    createInternetAccount,
    listInternetAccounts,
    deleteInternetAccountById
}