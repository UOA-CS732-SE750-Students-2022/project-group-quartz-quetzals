import axios from "axios";

const result = axios({
    method: 'get',
    url: 'http://127.0.0.1:3001/api/radio/getRadioProcess',
}).then(function (response) {
    return response;
})

it('successful connection to backend server', () => {
    expect(typeof result).toBe("object");
    expect(result.status != 400).toBe(true);
})

it('backend return is not empty', () => {
    expect(result.playlist === null).toBe(false);
})

it('successfully initialized live audio timestamp ', () => {
    expect(result.current === 0).toBe(false);
})