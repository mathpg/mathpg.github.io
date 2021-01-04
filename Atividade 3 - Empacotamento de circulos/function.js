var start = new Date().getTime();
var width=1800; //comprimento do retangulo
var height=800; //altura do retangulo
var n_circulo=0; //num de circulos desenhados
var circles=[]; //lista de circulos
var max_raio=10000; //var de controle do tamanho do raio
var timer; //timer de execucao da funcao
var time_interval=2000; //intervalo de execucao da funcao(milisegundos)

    //Gera uma cor aleatorio para o circulo
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //Gera um ponto aleatorio dentro da div "retangulo"
    function getRandomPoint(){
      var x = Math.random()*width;
      var y = Math.random()*height;
      console.log("Gerei x="+x);
      console.log("Gerei y="+y);
      return [x,y];
    }

    /*
      Cria um novo circulo e o desenha na tela
      O primeiro circulo é gerado com um raio de até 100px
    */
    function makeCircleAppear() {

        var point=getRandomPoint()
        var dentro=false;
        var dist_prox=max_raio;
        /*
          Procura o raio do ciruclo mais proximo
        */
        for(var i=0;i<n_circulo;i++){
          circle=circles[i]
          var d = Math.sqrt((circle[0]-point[0])**2 + (circle[1]-point[1])**2)
          if(d < circle[2]){
            dentro=true;
            break;
          }
          if(d < dist_prox){
            dist_prox=d;
          }
        }
        if(!dentro){
          /*
            Calculando o raio do novo circulo
          */
          circle=new Array(3);
          circle[0]=point[0];
          circle[1]=point[1];
          if(dist_prox < max_raio){
            dif1=max_raio
            dif2=max_raio
            circle[2]=Math.random()*dist_prox;
            if((circle[0]+circle[2]) >= width){
                dif1 = circle[0]+circle[2] - width
            }
            if((circle[1]+circle[2]) >= height){
                dif2 = circle[1]+circle[2] - height
            }
            if(dif1 != max_raio || dif2 != max_raio){
              circle[2]= dif1 < dif2 ? Math.random()*(width-circle[0]):Math.random()*(height-circle[1])
            }
          }else{
            circle[2]=Math.random()*100;
          }
          circles.push(circle)

          /*
            Criando a div do novo circulo
          */
          var left = circle[0]
          var top = circle[1];
          var raio = circle[2];
          var id_circulo='circulo' + n_circulo;
          n_circulo=n_circulo+1;
          var para = document.createElement("div");
          para.className="shaperandom"
          para.setAttribute('id',id_circulo)
          para.style.backgroundColor = getRandomColor();
          para.style.width = raio + "px";
          para.style.height = raio + "px";
          para.style.top = top + "px";
          para.style.left = left + "px";

          //add o elemento a div "retangulo"
          var element = document.getElementById("retangulo");
          element.appendChild(para);

          //atualizando o num de ciruclos
          document.getElementById("n_circles").innerHTML = n_circulo;

        }
    }

    //inicia o timer de execucao da funcao geradora de circulos
    function Start(){
      timer =  setInterval(makeCircleAppear,time_interval);
    }

    //pausa o timer de execucao da funcao geradora de circulos
    function Stop(){
        clearInterval(timer)
    }
