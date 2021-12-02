module.exports = {
    formato_nro : function (valor) {
        var nums = new Array();
        var simb = ".";
        valor = valor.toString();
        valor = valor.replace(/\D/g, "");
        nums = valor.split("");
        var long = nums.length - 1;
        var patron = 3;
        var prox = 2;
        var res = "";
    
        while (long > prox) {
            nums.splice((long - prox), 0, simb);
            prox += patron;
        }
    
        for (var i = 0; i <= nums.length - 1; i++) {
            res += nums[i];
        }
    
        return res.replace(/(\s\s)+/g) + '.-';
    }
}