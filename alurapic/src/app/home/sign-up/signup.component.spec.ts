import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { VMessageModule } from 'src/app/shared/componets/vmessage/vmessage.module';
import { SignUpComponent } from './signup.component';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

describe('O formulario signup', ()=>{

    let component : SignUpComponent;
    let router: Router;
    let signupService: SignUpService;

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations:[SignUpComponent],
            providers:[SignUpService, UserNotTakenValidatorService],
            imports:[
                HttpClientTestingModule,
                VMessageModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([])
            ]
        }).compileComponents;
    }));

    beforeEach(()=>{
        const fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        router = TestBed.get(Router);
        signupService = TestBed.get(SignUpService);
    });

    it('deve instanciado', ()=>{
        expect(component).toBeTruthy();
    });

    it('deve cadastrar um usuario', ()=>{
        const navigateSpy = spyOn(router, 'navigate');
        const sdas = spyOn(signupService, 'signup').and.returnValue(of(null));
        
        component.signupForm.get('email').setValue('alvaro@alvaro.com');
        component.signupForm.get('fullName').setValue('Alvaro');
        component.signupForm.get('userName').setValue('alvaro');
        component.signupForm.get('password').setValue('123');
        component.signUp();

        expect(navigateSpy).toHaveBeenCalledWith(['']);
        
    });

    it('deve realizar o log caso ocorra algum erro', ()=>{
        spyOn(signupService, 'signup').and.returnValue(
            throwError('erro no servidor')
        );
        component.signupForm.get('email').setValue('alvaro@alvaro.com');
        component.signupForm.get('fullName').setValue('Alvaro');
        component.signupForm.get('userName').setValue('alvaro');
        component.signupForm.get('password').setValue('123');
        const spyLog = spyOn(console, 'log');
        component.signUp();
        expect(spyLog).toHaveBeenCalledWith('erro no servidor');
    });
});