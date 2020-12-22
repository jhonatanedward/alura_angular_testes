import { of } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './footer.component';
import { TestBed, async } from '@angular/core/testing';

describe('o component footer deve', ()=>{

    let component:FooterComponent;
    
    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations:[
                FooterComponent
            ]
        }).compileComponents();
    }));

    beforeEach(()=>{
        
        const userService = TestBed.get(UserService);

        spyOn(userService, 'getUser').and.returnValue(of({
            email: 'alvaro@gmail.com',
            name: 'Alvaro',
            id: 1
        }));

        // Utiliza fixture ao invés de TesteBed.get
        const fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('deve ser instanciado', ()=>{
        expect(component).toBeTruthy();
    });
});