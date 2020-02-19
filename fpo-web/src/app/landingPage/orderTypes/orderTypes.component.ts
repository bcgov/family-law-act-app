import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, ValidatorFn, FormArray, AbstractControl } from '@angular/forms';

@Component({
    selector: 'orders',
    templateUrl: './orderTypes.component.html',
    styleUrls: ['./orderTypes.component.scss']
})
export class OrderTypesComponent implements OnInit {
    typeOfService: string;
    newUserServiceForm: FormGroup;

    newUserToService = {
        orders: [
            { name: 'Protection from family violence', value: 'PO', selected: false },
            { name: 'Family Law Matters including parenting arrangements, child support, contact with a child, guardianship of a child and spousal support under the Family Law Act', value: 'FLM', selected: false },
            { name: 'Case Management', value: 'CM', selected: false },
            { name: 'Priority Parenting Matters', value: 'PPM', selected: false },
            { name: 'Relocation of a child', value: 'RC', selected: false },
            { name: 'Enforcement of agreements and court orders under the Family Law Act', value: 'EA', selected: false }
        ]
    };

    newToService = {
        orders: [
            { name: 'Protection from family violence', value: 'PO', selected: false },
            { name: 'Family Law Matters including parenting arrangements, child support, contact with a child, guardianship of a child and spousal support under the Family Law Act', value: 'FLM', selected: false },
            { name: 'Priority Parenting Matters', value: 'PPM', selected: false },
            { name: 'Relocation of a child', value: 'RC', selected: false },
            { name: 'Enforcement of agreements and court orders under the Family Law Act', value: 'EA', selected: false }
        ]
    };

    constructor(private router: Router, private route: ActivatedRoute, private builder: FormBuilder) {

    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.typeOfService = params.typeOfService;
        });
        if (this.typeOfService) {
            this.constructForm(this.typeOfService);
        }
    }

    constructForm(typeOfService: string) {
        this.newUserServiceForm = this.builder.group({
            orders: this.buildOrder(typeOfService)
        });
    }

    buildOrder(typeOfService: string) {
        if (typeOfService === "newService") {
            const formArray = this.newUserToService.orders.map(order => {
                return this.builder.control(order.selected);
            });
            return this.builder.array(formArray, this.singleCheckboxTrueValidation());
        } else if (typeOfService === "new") {
            const formArray = this.newToService.orders.map(order => {
                return this.builder.control(order.selected);
            });
            return this.builder.array(formArray, this.singleCheckboxTrueValidation());
        }
    }

    get orders() {
        return this.newUserServiceForm.get('orders') as FormArray;
    }

    submitNewUserServiceForm() {
        let value = this.newUserServiceForm.value;
        const selectedOrders = Object.assign({}, {
            order: value.orders.map((selected, i) => {
                if (this.typeOfService === "newService") {
                    return {
                        value: this.newUserToService.orders[i].value,
                        selected
                    }
                } else if (this.typeOfService === "new") {
                    return {
                        value: this.newToService.orders[i].value,
                        selected
                    }
                }
            })
        })
        this.router.navigate(['order', this.typeOfService, 'login']);
    }

    singleCheckboxTrueValidation(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let minCheck = 1;
            let checked = 0;
            for (let i = 0; i < control.value.length; i++) {
                if (control.value[i]) {
                    checked++;
                }
            }
            return checked < minCheck ? { singleCheckboxTrueValidation: true } : null;
        }
    }
}
