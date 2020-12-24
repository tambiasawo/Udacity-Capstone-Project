import {postMethod} from '../src/client/js/app'

const fetch = require('node-fetch')
jest.mock('node-fetch')

describe(" h", ()=>{
    test("a", async () =>{
        fetch.mockResolvedValue(
            {'status':{
                'code': '0'
            }}
        )
            const result = await postMethod('http://localhost/send', {'name':'tambi'})
            expect(result.status.code).toBe('0')
    })
})


