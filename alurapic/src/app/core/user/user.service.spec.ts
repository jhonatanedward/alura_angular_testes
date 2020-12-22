import { TokenService } from './../token/token.service';
import { UserService } from 'src/app/core/user/user.service';

describe('o serviço UserService', ()=>{
    let service: UserService;
    beforeEach(()=>{
        const tokenService = new TokenService();
        service = new UserService(tokenService);
    });

    it('deve ser instanciado',()=>{
        expect(service).toBeTruthy();
    });

    it('deve, através de um token, recuperar informações do usuario',()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTYwODYwMjY2MiwiZXhwIjoxNjA4Njg5MDYyfQ.0tsqMnokoodJU8wS2fG-BcOxVJZ4L0WySaMAozYMGCg';
        service.setToken(token);
        expect(service.isLogged()).toBeTruthy();
        expect(service.getUserName()).toBe('flavio');
    });
});