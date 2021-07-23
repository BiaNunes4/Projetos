var input = document.getElementById("input");
var i = 0;
var itensDaLista = [];
var txtItem
carregarLista()


 function addItemNaLista(){
    if (input.value.length>0)
        txtItem = input.value; 
    
    
    if(txtItem.length>0){
        i++
        
        var divMain = document.getElementById("content");
        var divChild = document.createElement("div")
        var checkbox = document.createElement("input");
        var botao = document.createElement('button');
        var lixo = document.createElement('img')
         
        var labelCheckbox = document.createElement("label");
         
        

        labelCheckbox.setAttribute("id","label"+ i);
        checkbox.type = "checkbox";
        checkbox.setAttribute("id", "checkbox"+ i);
        botao.setAttribute("id", "botao"+ i);
        divChild.setAttribute("id", "div"+ i);
        divChild.classList.add("espacamentoDivChild");
        
        
          
        

        lixo.src = ".//trash-empty-icon.png";
        lixo.style.maxWidth = "20px"; 
        
        botao.appendChild(lixo);
        labelCheckbox.innerHTML =  txtItem;
        
        divChild.appendChild(checkbox);
        divChild.appendChild(labelCheckbox);
        divChild.appendChild(botao);
        
        divMain.appendChild(divChild);
        /* novoItem.innerHTML = txtItem; */
        itensDaLista.push(txtItem)
        salvarLista()
        botao.addEventListener("click", function(){
            let divDeletar
            let labelDeletar  
            
            if (this.id.length>=7){
                labelDeletar = document.getElementById("label"+this.id.substring(this.id.length-2, this.id.length))
                divDeletar = document.getElementById("div"+this.id.substring(this.id.length-2, this.id.length));
            }
            else{
                labelDeletar = document.getElementById("label"+this.id.substring(this.id.length-1, this.id.length))
                divDeletar = document.getElementById("div"+this.id.substring(this.id.length-1, this.id.length));
            }
            console.log(labelDeletar.innerHTML)
            itensDaLista.splice(itensDaLista.indexOf(labelDeletar.innerHTML),1)
            divDeletar.remove();
            salvarLista();
            
            
            
        }); 
        
    

        
    }
    function salvarLista(){
        localStorage.setItem("lista", JSON.stringify(itensDaLista));
    }
    
    

    input.value="";
    input.focus();
   






$(document).click(function(){
    
    if(i>0){
        for (var j = 1; j <= i; j++){
            let label = document.getElementById("label"+j)
            let chk = document.getElementById("checkbox"+j)
            if (chk != null){
                if(document.getElementById("checkbox"+j).checked){
                
                    label.classList.add("textoRiscado");
                }else {
                    label.classList.remove("textoRiscado");
                  
                }
            }
            
               
            }
        }

    
    

})


 }
 function carregarLista(){
    var listaLocalStorage = localStorage.getItem("lista");
    listaLocalStorage= JSON.parse(listaLocalStorage)
    for (var i=0; i<listaLocalStorage.length; i++){
        txtItem = listaLocalStorage[i]
        addItemNaLista();
        

    }
    

}
