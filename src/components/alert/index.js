import Vue from 'vue'
import AlertComponent from './alert.vue'

const merge = ($data, option) => {
    for ( let prop in option) {
        if ($data.hasOwnProperty(prop)) {
            $data[prop] = option[[prop]]
        }
    }
};

//extend 是构造一个组件的语法器.传入参数，返回一个组件
let AlertConstructor = Vue.extend(AlertComponent);

const Alert = (option={}) => {
    let initComponent = new AlertConstructor();
    initComponent.$mount();
    merge(initComponent.$data, option)
    return new Promise( (resolve, reject) => {
        initComponent.success = () => {
            initComponent.show = false;
            resolve()
        }
        initComponent.cancel = () => {
            initComponent.show = false;
            reject()
        }

        document.querySelector(option.container || 'body').appendChild(initComponent.$el);
    })
}

export default Alert