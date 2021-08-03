var id = 0;
var itensDaLista = [];
var txtItem;
var riscadoSalvo = localStorage.getItem("riscado");

function addItemNaLista(){
    let input = document.getElementById("input");

    if (input.value != "")
        txtItem = input.value; 
    
    if(txtItem.value != ""){
        id++
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute("id", "checkbox"+ id);        
         
        let labelCheckbox = document.createElement("label");
        labelCheckbox.setAttribute("id","label"+ id);
        
        if (riscadoSalvo != null) {
            if (riscadoSalvo[id-1] == "s") {
                labelCheckbox.classList.add("textoRiscado");
                checkbox.checked = true;
            }
        }
        
        let lixo = document.createElement('img');
        lixo.src = ".//trash-empty-icon.png";
        lixo.style.maxWidth = "20px"; 
        
        let botao = document.createElement('button');
        botao.setAttribute("id", "botao"+ id);
        botao.appendChild(lixo);
        labelCheckbox.innerHTML = txtItem;

        let divChild = document.createElement("div");
        divChild.setAttribute("id", "div"+ id);
        divChild.classList.add("espacamentoDivChild");
        divChild.appendChild(checkbox);
        divChild.appendChild(labelCheckbox);
        divChild.appendChild(botao);
     
        document.getElementById("content").appendChild(divChild);
        
        itensDaLista.push(txtItem)
        salvarLista()
        botao.addEventListener("click", function(){
            if (confirm("Apagar o item?")) {
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

                itensDaLista.splice(itensDaLista.indexOf(labelDeletar.innerHTML),1)
                divDeletar.remove();
                salvarLista();
            }       
        });
    }
    
    input.value="";
    input.focus();
   
    $(document).click(function(){
        if(id>0){
            for (let j = 1; j <= id; j++){
                let label = document.getElementById("label"+j);
                let chk = document.getElementById("checkbox"+j);

                if (chk != null) {
                    if(chk.checked){
                        label.classList.add("textoRiscado");
                    } else {
                        label.classList.remove("textoRiscado");
                    }
                }
            }

            checkboxSalvo();
        }
    })
}

function salvarLista(){
    localStorage.setItem("lista", JSON.stringify(itensDaLista));
}

function checkboxSalvo() {
    let riscados = [];

    for (let i = 1; i <= id; i++) {
        let checkbox = document.getElementById("checkbox"+i);

        if (checkbox != null) {
            checkbox.type = "checkbox";
            riscados.push(checkbox.checked ? "s" : "n");
            localStorage.setItem("riscado", JSON.stringify(riscados));
        }           
    }
}

function carregarLista(){
    let listaLocalStorage = localStorage.getItem("lista");

    if (listaLocalStorage != null) {
        listaLocalStorage= JSON.parse(listaLocalStorage);
        riscadoSalvo = JSON.parse(riscadoSalvo);

        for (let i = 0; i < listaLocalStorage.length; i++){
            txtItem = listaLocalStorage[i];
            addItemNaLista();
        }
    }
}
