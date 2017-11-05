import Mock from 'mockjs'

Mock.setup({
    timeout: '1000-2000'
})

let proxyObj = [{a: 'aa', b: 'bb', c: 'cc', d: 'dd'}];
Mock.mock('http://www.test.com', 'get', {
    'list|3-5': [
        {
            'name': '@cname',
            'age|20-30': 0,
            'sex|0-1': 0,
            'city': '@city',
            'color': '@color',
            'obj|2': proxyObj,
        }
    ],
    'code': 1,
    'msg': '请求成功'
})

export default Mock