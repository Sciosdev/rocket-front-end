export class Registro {
    
    constructor(
    public row_number: number,
    public order: JSON,
    public billing_address: JSON,
    public shipping_address: JSON,
    public payment: JSON,
    public extra: JSON){}

}