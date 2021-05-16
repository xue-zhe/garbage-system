const Router = require('koa-router');
const router = new Router();
const login = require('./login');
const register = require('./register')
const verification = require('./verification')
const person = require('./person')
const garbage = require('./garbage')
const admin = require('./admin')
const imgs = require('./imgs')
const knowledge = require('./knowledge')

router.use('/login',login.routes(), login.allowedMethods());   //登录
router.use('/register',register.routes(), register.allowedMethods());   //注册
router.use('/verification',verification.routes(), verification.allowedMethods());  //验证码
router.use('/person',person.routes(), person.allowedMethods());  //用户个人信息
router.use('/garbage',garbage.routes(), garbage.allowedMethods());   //垃圾的相关投放信息
router.use('/admin',admin.routes(), admin.allowedMethods());   //管理员对网站的管理
router.use('/imgs',imgs.routes(), imgs.allowedMethods());   //首页
router.use('/knowledge',knowledge.routes(), knowledge.allowedMethods());   //垃圾分类知识
router.redirect('/','/home')    
module.exports = router