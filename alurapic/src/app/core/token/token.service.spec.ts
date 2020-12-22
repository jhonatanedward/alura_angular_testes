import { TokenService } from './token.service';

describe('O servico TokenService', ()=>{

    let token : string;
    let service : TokenService;
    
    beforeEach(()=>{
        token = 'testetoken';
        service = new TokenService();
    });

    afterEach(()=>{
        localStorage.clear();
    });

    it('deve ser instanciado',()=>{
        expect(service).toBeTruthy();
    });

    it('deve guardar um token', ()=>{
        service.setToken(token);
        expect(service.hasToken()).toBeTruthy();
        expect(service.getToken()).toBe('testetoken');        
    });

    it('deve remover o token',()=>{
        service.setToken(token);
        service.removeToken();
        expect(service.hasToken()).toBeFalsy();
        expect(service.getToken()).toBeFalsy();
    });

   
});