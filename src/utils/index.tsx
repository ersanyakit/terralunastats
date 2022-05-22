import {BigNumber, ethers} from "ethers";

export default function jsNumberForAddress (address : string) : number {
    const addr = address.slice(2, 10);
    const seed = parseInt(addr, 16);
    return seed;
}

export function formatValue(value:string, fixed : boolean, decimal = 2 ) : string{
    value = ethers.utils.formatUnits( value , 6 );
    if( fixed == true )
    {
        let parse = value.split('.');

        value = parse[0] + ( parse[1] && decimal > 0 ? '.' : '') + parse[1].substring(0,decimal);
    }
    return value;
}

export function numberWithCommas(value) {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
