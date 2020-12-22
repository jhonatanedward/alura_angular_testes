import { TokenService } from './token.service';

describe('O servico TokenService', ()=>{

    afterEach(()=>{
        localStorage.clear();
    });

    it('deve ser instanciado',()=>{
        const service = new TokenService();
        expect(service).toBeTruthy();
    });

    it('deve guardar um token', ()=>{
        const token = 'testetoken';
        const service = new TokenService();
        service.setToken(token);
        expect(service.hasToken()).toBeTruthy();
        expect(service.getToken()).toBe('testetoken');        
    });

    it('deve remover o token',()=>{
        const token = 'testetoken';
        const service = new TokenService();
        service.setToken(token);
        service.removeToken();
        expect(service.hasToken()).toBeFalsy();
        expect(service.getToken()).toBeFalsy();
    });
});