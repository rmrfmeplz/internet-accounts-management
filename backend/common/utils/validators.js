// noinspection DuplicatedCode

const platformIconUploadConstants = require('../../constants/platformIconUploadConstants')

function validatePlatformName(platformName) {
    return typeof platformName === 'string' && platformName.trim()
}

function validateAccount(account) {
    return typeof account === 'string' && account.trim()
}

function validatePlatformIconType(data) {
    const isJPG = data.length >= 3 && data[0] === 0xFF && data[1] === 0xD8 && data[2] === 0xFF
    const isPNG = data.length >= 8 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4E && data[3] === 0x47 && data[4] === 0x0D && data[5] === 0x0A && data[6] === 0x1A && data[7] === 0x0A
    const isGIF = data.length >= 6 && data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x38 && (data[4] === 0x37 || data[4] === 0x39) && data[5] === 0x61
    const isWebP = data.length >= 12 && data[0] === 0x52 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x46 && data[8] === 0x57 && data[9] === 0x45 && data[10] === 0x42 && data[11] === 0x50
    return isJPG || isPNG || isGIF || isWebP
}

function validatePlatformIconSize(size) {
    return size <= platformIconUploadConstants.ALLOWED_IMAGE_SIZE
}

function validatePlatformIconBase64Size(size) {
    return size <= platformIconUploadConstants.ALLOWED_IMAGE_BASE64_SIZE
}

function validateRemark(remark) {
    return typeof remark === 'string'
}

function validatePlatformIcon(platformIcon) {
    return typeof platformIcon === 'string'
}

function validateBase64(base64) {
    return typeof base64 === 'string' && /^[A-Za-z0-9+/=]+$/.test(base64)
}

function validateInternetAccountId(id) {
    const uuidV4HyphenatedRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return typeof id === 'string' && uuidV4HyphenatedRegex.test(id)
}

function validatePlatformIconBase64(platformIcon) {
    const regexStr = `^data:image\\/(${platformIconUploadConstants.ALLOWED_IMAGE_SUFFIXS.join('|')});base64,(.+)$`
    const matchResult = platformIcon.match(new RegExp(regexStr))
    if (!matchResult) return {
        success: false,
        errMsg: `仅支持上传 ${platformIconUploadConstants.ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()} 格式的图片`
    }
    const base64Data = matchResult[2]
    if (!validateBase64(base64Data)) return {success: false, errMsg: '请上传有效的图片文件'}
    if (!validatePlatformIconBase64Size(base64Data.length)) return {
        success: false,
        errMsg: `仅支持 Base64 编码且字符数不超过 ${platformIconUploadConstants.ALLOWED_IMAGE_BASE64_SIZE} 的图片，当前编码长度已超出限制`
    }
    const data = Buffer.from(base64Data, 'base64')
    if (!validatePlatformIconType(data)) return {
        success: false,
        errMsg: `仅支持上传 ${platformIconUploadConstants.ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()} 格式的图片`
    }
    if (!validatePlatformIconSize(data.length)) return {
        success: false,
        errMsg: `仅支持上传大小不超过 ${platformIconUploadConstants.ALLOWED_IMAGE_SIZE / 1024 / 1024} MB 的图片`
    }
    return {success: true, errMsg: ''}
}

function validatePassword(password) {
    if (typeof password !== 'string' || !password.trim()) return {
        success: false,
        errMsg: '密码不能为空且不能仅包含空白字符'
    }
    if (password.length < 8 || password.length > 16) return {
        success: false,
        errMsg: '密码长度必须在8-16个字符之间'
    }
    if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;:,.?~]{8,16}$/.test(password)) return {
        success: false,
        errMsg: '密码仅支持字母、数字和以下特殊字符：!@#$%^&*()_+-=[]{}|;:,.?~'
    }
    const regexList = [
        /[A-Z]/,
        /[a-z]/,
        /[0-9]/,
        /[!@#$%^&*()_+\-=\[\]{}|;:,.?~]/
    ]
    const matchCount = regexList.reduce((count, regex) => {
        return regex.test(password) ? count + 1 : count
    }, 0)
    if (matchCount < 3) return {
        success: false,
        errMsg: '密码必须至少包含大写字母、小写字母、数字、允许的特殊字符中的三种'
    }
    return {success: true, errMsg: ''}
}

function validateUsername(username) {
    if (typeof username !== 'string' || !username.trim()) return {
        success: false,
        errMsg: '用户名不能为空且不能仅包含空白字符'
    }
    if (username.length < 5 || username.length > 15) return {
        success: false,
        errMsg: '用户名长度必须在5-15个字符之间'
    }
    if (!/^[A-Za-z0-9_]{5,15}$/.test(username)) return {
        success: false,
        errMsg: '用户名仅支持大小写字母、数字和下划线(_)'
    }
    return {success: true, errMsg: ''}
}

module.exports = {
    platformName: validatePlatformName,
    account: validateAccount,
    remark: validateRemark,
    platformIcon: validatePlatformIcon,
    internetAccountId: validateInternetAccountId,
    platformIconBase64: validatePlatformIconBase64,
    password: validatePassword,
    username: validateUsername
}