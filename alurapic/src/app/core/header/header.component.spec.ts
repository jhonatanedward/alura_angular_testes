import { User } from './../user/user';
import { of } from 'rxjs';
import { LoadingModule } from './../../shared/componets/loading/loading.module';
import { AlertModule } from './../../shared/componets/alert/alert.module';
import { MenuModule } from './../../shared/componets/menu/menu.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/core/user/user.service';
import { HeaderComponent } from './header.component';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('o component header', ()=>{

    let component :HeaderComponent;
    let userService: UserService;
    let router: Router;

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations:[
                HeaderComponent
            ],
            providers:[
                UserService
            ],
            imports:[
                RouterTestingModule.withRoutes([]),
                MenuModule,
                AlertModule,
                LoadingModule
            ]
        }).compileComponents();
    }));

    beforeEach(()=>{
        
        userService = TestBed.get(UserService);

        router = TestBed.get(Router);

        spyOn(userService, 'getUser').and.returnValue(
            of({
                name:'Alvaro',
                email: 'alvaro@alvaro.com',
                id: 1
            })
        );

        const fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        // Executa os métodos de ciclo de vida do component
        fixture.detectChanges();
    });

    it('deve ser instanciado',()=>{
        expect(component).toBeTruthy();
    });

    it('deve realizar o logout', ()=>{
        const spy = spyOn(userService, 'logout').and.returnValue(null);
        const navigateSpy = spyOn(router, 'navigate');
        
        component.logout();

        expect(spy).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(['']);
        
    });
});