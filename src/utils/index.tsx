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

function formatNums(num,sep,dec,u){
    sep=sep||',';u=u||'\\d';if(typeof num!='string'){
        num=String(num);
        if(dec&&dec!='.')
            num=num.replace('.',dec);}
    return num.replace(RegExp('\\'+(dec||'.')+u+'+|'+u+'(?=(?:'+u+'{3})+(?!'+u+'))','g'),function(a){
        return a.length==1?a+sep:a})}

export function numberWithCommas(value) {
    return  formatNums(value,',','.','[\\d\\u0660-\\u0669\\u06f0-\\u06f9]');


}
