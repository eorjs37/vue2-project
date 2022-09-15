module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "prettier", "plugin:prettier/recommended"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-unused-vars": "off",
        "vue/no-unused-components": "warn",
        "prettier/prettier": "off",
    },
};
