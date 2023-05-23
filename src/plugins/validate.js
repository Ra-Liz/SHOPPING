import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh CN'
Vue.use(VeeValidate)

VeeValidate.Validator.location('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`
    },
    attributes: {
        phone: '手机号码',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    },
})

//自定义校验规则
VeeValidate.validator.extend("agree",{
    validate:(value)=>{
        return value;
    },
    getMessage:(field) => field + "必须同意",
})