import { TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/core/user/user.service';

describe('o serviço UserService', ()=>{
    
    let service: UserService;

    beforeEach(()=>{
        
        TestBed.configureTestingModule({
            providers: [UserService]
        });
        
        service = TestBed.get(UserService);
    });

    it('deve ser instanciado',()=>{
        expect(service).toBeTruthy();
    });

    it('deve, através de um token, recuperar informações do usuario',()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTYwODYwMjY2MiwiZXhwIjoxNjA4Njg5MDYyfQ.0tsqMnokoodJU8wS2fG-BcOxVJZ4L0WySaMAozYMGCg';
        service.setToken(token);
        expect(service.isLogged()).toBeTruthy();
        expect(service.getUserName()).toBe('flavio');
        service.getUser().subscribe(user=>{
            expect(user.name).toBe('flavio');
        });
    });

    it('deve limpar as informações no logout', ()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTYwODYwMjY2MiwiZXhwIjoxNjA4Njg5MDYyfQ.0tsqMnokoodJU8wS2fG-BcOxVJZ4L0WySaMAozYMGCg';
        service.setToken(token);
        service.logout();
        expect(service.isLogged()).toBeFalsy();
        expect(service.getUserName()).toBe('');
    });
});