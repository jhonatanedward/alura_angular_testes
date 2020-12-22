import { UserService } from 'src/app/core/user/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
describe('O serviço AuthService',()=>{
    
    let service: AuthService;
    let httpMock: HttpTestingController;
    let userService: UserService;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            providers: [
                AuthService
            ]
        });

        service = TestBed.get(AuthService);
        httpMock = TestBed.get(HttpTestingController);
        userService = TestBed.get(UserService);
    });

    it('deve ser instanciado',()=>{
        expect(service).toBeTruthy();
    });

    it('deve autenticar o usuario', ()=>{
        const fakeBody = {
            id: 1,
            nome: 'Alvaro',
            email: 'alvaro@alura.com'
        };

        spyOn(userService, 'setToken').and.returnValue(null);

        service.authenticate('alvaro', '1234').subscribe((response)=>{
            expect(response.body).toEqual(fakeBody);
            expect(response.headers.get('x-access-token')).toBe('tokenteste');
        });
 
        // Espera uma chamada
        const request = httpMock.expectOne((request)=>{
            return request.method == "POST";
        });

        request.flush(fakeBody,{
            headers: {
                'x-access-token': 'tokenteste'
            }
        });
    });
})