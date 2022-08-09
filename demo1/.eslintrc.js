module.exports = {
    rules:{
        "quotes":[2,"double"],
        "semi":"error"
    },
    parserOptions:{
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    plugins:["vue"],
    extends:["plugin:vue/recommended"] //规则
}