const letter = ["a","b","c","d","e","f","g","h"];
const number = ["1","2","3","4","5","6","7","8"];
const css_active_border = "2px red solid";
const css_normal_border = "2px black solid";
const css_moves_border = "2px blue solid";

let moves = [];

const first_corner_edge = []
const second_corner_edge = []
const third_corner_edge = []
const fourth_corner_edge = []
for(i=0; i<8; i++){
    first_corner_edge.push(letter[i]+1);
    second_corner_edge.push(letter[i]+1);
}
for(i=0; i<8; i++){
    third_corner_edge.push(letter[i]+8);
    fourth_corner_edge.push(letter[i]+8);
}
for(i=0; i<8; i++){
    first_corner_edge.push("a"+number[i]);
    third_corner_edge.push("a"+number[i]);
}
for(i=0; i<8; i++){
    second_corner_edge.push("h"+number[i]);
    fourth_corner_edge.push("h"+number[i]);   
}
// console.log(first_corner_edge);
// console.log(second_corner_edge);
// console.log(third_corner_edge);
// console.log(fourth_corner_edge);

createBoard(letter, number);

// CREATE BOARD

function createBoard(letter, number){
    const board = document.createElement('table');
    for(i=0; i<8; i++){

        const row = document.createElement('tr');
        for(j=0; j<8; j++){
            const cell = document.createElement('td');
            cell.classList.add("square");
            cell.setAttribute('id', letter[j]+number[i]);
            
            // cell.textContent = letter[j]+number[i]

            cell.style.backgroundColor = (i + j) % 2 === 0 ? '#f5ead0' : '#b5a791';
            row.appendChild(cell);
        }
        board.appendChild(row)
    }
    document.getElementById("board").appendChild(board);
    // document.body.appendChild(board);

    
}
setPawn();
setRook();
setHorse();
setBishop();
setQueen();
setKing();
function setPawn(){  
    for(i=0; i<8; i++){    
        const pawn_blk = document.createElement('img');
        pawn_blk.src ='assets/pawn_blk.png';
        pawn_blk.alt = 'pawn_blk';
        pawn_blk.classList.add("pawn");
        
        const pawn_wht = document.createElement('img');
        pawn_wht.src ='assets/pawn_wht.png';
        pawn_wht.alt = 'pawn_wht';
        pawn_wht.classList.add("pawn");
        

        let cell = document.getElementById(letter[i]+"2");
        cell.appendChild(pawn_blk);    

        let cell1 = document.getElementById(letter[i]+"7");
        cell1.appendChild(pawn_wht);  
    }
}
// populate with pawns
function setRook() {  
    let white_rooks = [document.getElementById("a8"),document.getElementById("h8")]
    
    for(i=0; i<2; i++){
        const rook_wht = document.createElement('img');
        rook_wht.src = 'assets/rook_wht.png';
        rook_wht.alt = 'rook_wht';
        white_rooks[i].appendChild(rook_wht);
    }

    let black_rooks = [document.getElementById("a1"),document.getElementById("h1")]
    
    for(i=0; i<2; i++){
        const rook_blk = document.createElement('img');
        rook_blk.src = 'assets/rook_blk.png';
        rook_blk.alt = 'rook_blk';
        black_rooks[i].appendChild(rook_blk);
    }
}
function setBishop(){
    let white_bishop = [document.getElementById("c8"),document.getElementById("f8")]
    
    for(i=0; i<2; i++){
        const bishop_wht = document.createElement('img');
        bishop_wht.src = 'assets/bishop_wht.png';
        bishop_wht.classList.add("bishop");
        bishop_wht.alt = 'bishop_wht';
        white_bishop[i].appendChild(bishop_wht);
    }

    let black_bishop = [document.getElementById("c1"),document.getElementById("f1")]
    
    for(i=0; i<2; i++){
        const bishop_blk = document.createElement('img');
        bishop_blk.src = 'assets/bishop_blk.png';
        bishop_blk.classList.add("bishop");
        bishop_blk.alt = 'bishop_blk';
        black_bishop[i].appendChild(bishop_blk);
    }
}

function setHorse(){
    let white_horse = [document.getElementById("b8"),document.getElementById("g8")]
    
    for(i=0; i<2; i++){
        const horse_wht = document.createElement('img');
        horse_wht.src = 'assets/horse_wht.png';
        horse_wht.classList.add("horse");
        horse_wht.alt = 'horse_wht';
        white_horse[i].appendChild(horse_wht);
    }

    let black_horse = [document.getElementById("b1"),document.getElementById("g1")]
    
    for(i=0; i<2; i++){
        const horse_blk = document.createElement('img');
        horse_blk.src = 'assets/horse_blk.png';
        horse_blk.classList.add("horse");
        horse_blk.alt = 'horse_blk';
        black_horse[i].appendChild(horse_blk);
    }
}

function setQueen(){
    const queen_wht = document.createElement('img');
    queen_wht.src = 'assets/queen_wht.png';
    queen_wht.classList.add("queen");
    queen_wht.alt = 'queen_wht';
    document.getElementById("d8").appendChild(queen_wht)

    const queen_blk = document.createElement('img');
    queen_blk.src = 'assets/queen_blk.png';
    queen_blk.classList.add("queen");
    queen_blk.alt = 'queen_blk';
    document.getElementById("d1").appendChild(queen_blk)
}

function setKing(){  
     const king_wht = document.createElement('img');
    king_wht.src = 'assets/king_wht.png';
    king_wht.classList.add("king");
    king_wht.alt = 'king_wht';
    document.getElementById("e8").appendChild(king_wht)

    const king_blk = document.createElement('img');
    king_blk.src = 'assets/king_blk.png';
    king_blk.classList.add("king");
    king_blk.alt = 'king_blk';
    document.getElementById("e1").appendChild(king_blk)
}


const squares = document.querySelectorAll(".square");
let active_square = null;

const turn_indicator = document.getElementById("turn_indicator");

// _wht white or _blk black
let turn = "_wht";


squares.forEach(square => {
    square.addEventListener('click', () => {
        
        // console.log(moves.includes(square.id))
        // reset if same square selected
        if(active_square == square){
            square.style.border = css_normal_border;
            square.style.filter = "opacity(100%)"
            active_square = null;
            
            resetBoardSaturation();

            turn == "_wht"? turn = "_blk" : turn = "_wht";


        }
        // set active square if has a piece
        else if(square.querySelector("img") != null){

            // eat ???
            if(active_square != null){
                if(getColor(square) != getColor(active_square)){
                    if(moves.includes(square.id)){
                    square.removeChild(square.querySelector('img'));
                    square.appendChild(active_square.querySelector('img'));

                    // reset
                    // active_square.style.border = css_normal_border;
                    active_square.style.filter = "opacity(100%)"
                    active_square = null;

                    resetBoardSaturation();

                    turn == "_wht"?  turn_indicator.style.backgroundColor = "#FFFEB8" : turn_indicator.style.backgroundColor = "black";
                    }
                }
            }
            else if(getColor(square)==turn){

                turn == "_wht"? turn = "_blk" : turn = "_wht";

                // reset style of previous active square if exist
                if(active_square != null){
                    active_square.style.border = css_normal_border;
                }
                // square.style.border = css_active_border;
                square.style.filter = "opacity(50%)"
                // check possible moves
                checkMoves(square);
                
                // for(i=0; i<length(moves))
                // moves.style.border = css_moves_border;

                active_square = square;
            }
        }


        // Move??
        if(active_square != null && square.querySelector('img')==null){
            if(moves.includes(square.id)){
                square.appendChild(active_square.querySelector('img'));
                active_square.style.border = css_normal_border;
                active_square.style.filter = "opacity(100%)"
                active_square = null;
                
                resetBoardSaturation();

                turn == "_wht"?  turn_indicator.style.backgroundColor = "#FFFEB8" : turn_indicator.style.backgroundColor = "black";
            }
        }
        

    });
});

function checkMoves(square){
    
    // console.log(getPiece(square));

    let piece = getPiece(square);

    if(piece === 'pawn'){
        straightOne(square);

    }
    else if(piece == "bishop"){
        diagonals(square);
    }
    else if(piece=="rook"){
        straights(square);
    }
    else if(piece =="queen"){
        diagonals(square);
        straights(square);
    }
    else if(piece == 'horse'){
        horseMove(square);
    }
    else{
        diagonals(square);
        straights(square);
    }
    highlightMoves(square);
}

// moves
function diagonals(square) {

    const letter_index  = letter.indexOf(square.id[0])
    const id_number = Number(square.id[1]);
    
    let j = id_number;
    let flag = 0;
    for(i=letter_index; i>-1; i--, j--){
        // document.getElementById(letter[i]+j).style.filter ="saturate(500%)";
        moves.push(letter[i]+j);
        if(getPiece(square) == 'king' && flag == 1){
            break
        }
        // if in edge of board end loop
        if(first_corner_edge.find((element) => element === letter[i]+j)){
            break
        }
        // if blocked by a piece
        else if(document.getElementById(letter[i]+j).querySelector('img') != null && flag != 0){
            break
        }
        flag++;
    }
    j = id_number;
    flag = 0;
    for(i=letter_index; i<8; i++, j--){
       
        moves.push(letter[i]+j);
        if(getPiece(square) == 'king' && flag == 1){
            break
        }
        if(first_corner_edge.find((element) => element === letter[i]+j)){
            break
        }
        else if(document.getElementById(letter[i]+j).querySelector('img') != null && flag != 0){
            break
        }
        flag++;
    }
    j = id_number;
    flag = 0;
    for(i=letter_index; i>-1; i--, j++){
       
        moves.push(letter[i]+j);
        if(getPiece(square) == 'king' && flag == 1){
            break
        }
        if(third_corner_edge.find((element) => element === letter[i]+j)){
            break
        }
        else if(document.getElementById(letter[i]+j).querySelector('img') != null && flag != 0){
            break
        }
        flag++;
    }
    j = id_number;
    flag = 0;
    for(i=letter_index; i<8; i++, j++){
    
        moves.push(letter[i]+j);
        if(getPiece(square) == 'king' && flag == 1){
            break
        }
        if(fourth_corner_edge.find((element) => element === letter[i]+j)){
            break
        }
        else if(document.getElementById(letter[i]+j).querySelector('img') != null && flag != 0){
            break
        }
        flag++;
    }

}

function straights(square) {  
    const letter_index  = letter.indexOf(square.id[0])
    const id_number = Number(square.id[1]);
    
    let j;
    let flag = 0;
    for(j=id_number; j>-1; j--){
        moves.push(letter[letter_index]+j);

        if(getPiece(square) == 'king' && flag == 1){
            break
        }

        if(first_corner_edge.find((element) => element === letter[letter_index]+j)){
            break
        }
        else if(document.getElementById(letter[letter_index]+j).querySelector('img') != null && flag != 0){
            break
        }
        flag++;
    }
    flag = 0;
    for(j=id_number; j<9; j++){
        // console.log(letter[letter_index]+j);
        moves.push(letter[letter_index]+j);

        if(getPiece(square) == 'king' && flag == 1){
            break
        }
        if(third_corner_edge.find((element) => element === letter[letter_index]+j)){
            break
        }
        else if(document.getElementById(letter[letter_index]+j).querySelector('img') != null && flag != 0){
            break
        }
        flag++;
    }
    flag = 0;
    for(j=letter_index ; j<8; j++){
        // console.log(letter[j]+id_number);
        moves.push(letter[j]+id_number);

        if(getPiece(square) == 'king' && flag == 1){
            break
        }
        if(third_corner_edge.find((element) => element === letter[j]+id_number)){
            break
        }
        else if(document.getElementById(letter[j]+id_number).querySelector('img') != null && flag != 0){
            break
        }
        flag++;
    }
    flag = 0;
    for(j=letter_index ; j>-1; j--){
        // console.log(letter[j]+id_number);
        moves.push(letter[j]+id_number);

        if(getPiece(square) == 'king' && flag == 1){
            break
        }
        if(first_corner_edge.find((element) => element === letter[j]+id_number)){
            break
        }
        else if(document.getElementById(letter[j]+id_number).querySelector('img') != null && flag != 0){
            break
        }
        flag++;
    }
}
// for Pawn
function straightOne(square) {  
    let letter_index  = letter.indexOf(square.id[0])
    let id_number = Number(square.id[1]);
    let first_move = false;

    if(getColor(square)=='_wht'){
        let next_square=document.getElementById(letter[letter_index]+(id_number-1))
        // check if there's a piece in front of pawn
        if(next_square.querySelector('img') == null){
            for(i=0; i<8;i++){

                if(square.id == letter[i]+7){
                    
                    first_move = true;
                    break;
                }
            }
            if(first_move == true){
                for(i=0;i<2;i++){
                    id_number--
                    moves.push(letter[letter_index]+id_number);
                }
            }
            else{
                id_number--
                moves.push(letter[letter_index]+id_number);
            }       
        }
        letter_index  = letter.indexOf(square.id[0])
        id_number = Number(square.id[1])
        if(letter_index-1 > -1 && id_number-1 > 0){
            let eat_left = document.getElementById(letter[letter_index-1]+(id_number-1)) 
            if(eat_left.querySelector('img') != null){
                if(getColor(eat_left) !== getColor(square)){
                    moves.push(letter[letter_index-1]+(id_number-1));
                }
            }
        }
        if(letter_index+1 < 8 && id_number-1 > 0){
            let eat_right = document.getElementById(letter[letter_index+1]+(id_number-1))
            if(eat_right.querySelector('img') != null){
                if(getColor(eat_right) !== getColor(square)){
                    moves.push(letter[letter_index+1]+(id_number-1));
                }
            }
        }
        
    }else{
        let next_square=document.getElementById(letter[letter_index]+(id_number+1))
        if(next_square.querySelector('img') == null){
            for(i=0; i<8;i++){
                if(square.id == letter[i]+2){
                    first_move = true;
                    break;
                }
            }
            if(first_move == true){
                for(i=0;i<2;i++){
                    id_number++
                    moves.push(letter[letter_index]+id_number);
                }
            }
            else{
                id_number++
                moves.push(letter[letter_index]+id_number);
            }
        }
        letter_index  = letter.indexOf(square.id[0])
        id_number = Number(square.id[1])
        if(letter_index-1 > -1 && id_number+1 < 9){
            let eat_left = document.getElementById(letter[letter_index-1]+(id_number+1)) 
            if(eat_left.querySelector('img') != null){
                if(getColor(eat_left) !== getColor(square)){
                    moves.push(letter[letter_index-1]+(id_number+1));
                }
            }
        }
        if(letter_index+1 < 8 && id_number+1 < 9){
            let eat_right = document.getElementById(letter[letter_index+1]+(id_number+1))
            if(eat_right.querySelector('img') != null){
                if(getColor(eat_right) !== getColor(square)){
                    moves.push(letter[letter_index+1]+(id_number+1));
                }
            }
        }
    }
    // console.log(moves);
}

function horseMove(square) {  

    const letter_index  = letter.indexOf(square.id[0])
    let id_number = Number(square.id[1]);   
    
    // White side perspective 
    // first L from upper left
    letter_index-1 >= 0 && id_number-2 > 0 ? moves.push(letter[letter_index-1]+(id_number-2)) : '';
    // first L from upper right
    letter_index-1 < 9 && id_number-2 > 0 ? moves.push(letter[letter_index+1]+(id_number-2)) : '';
    
    // ---

    // lower-left 
    letter_index-1 >= 0 && id_number+2 < 9 ? moves.push(letter[letter_index-1]+(id_number+2)) : '';
    // lower-right
    letter_index-1 < 9 && id_number+2 < 9 ? moves.push(letter[letter_index+1]+(id_number+2)) : '';
    
    // ---

    // left, up
    letter_index-2 >= 0 && id_number-1 > 0 ? moves.push(letter[letter_index-2]+(id_number-1)) : '';
    // left, down
    letter_index-2 >= 0 && id_number+1 < 9 ? moves.push(letter[letter_index-2]+(id_number+1)) : '';

    
    // right, up
    letter_index+2 < 8 && id_number-1 > 0 ? moves.push(letter[letter_index+2]+(id_number-1)) : '';
    // right, down
    letter_index+2 < 8 && id_number+1 < 9 ? moves.push(letter[letter_index+2]+(id_number+1)) : '';
    // letter_index-2 >= 0 && id_number+1 < 9 ? moves.push(letter[letter_index-2]+(id_number+1)) : '';
        
    
    // // rigt, up
    // console.log(letter_index+2 < 8 && [id_number-1] > 0)
    // console.log(letter[letter_index+2]+[id_number-1])
    // letter[letter_index+2] !== NaN && (id_number+1) !== NaN ? console.log(letter[letter_index+2] + (id_number+1)) :'';
    // console.log(letter[letter_index+2] + (id_number+1));
    
}




function resetBoardSaturation(){
    moves = [];
    // Get all elements with the class 'square'
    const squares = document.querySelectorAll('.square');

    // Iterate over each square and set the saturation to 100%
    squares.forEach(square => {
    square.style.filter = 'saturate(100%)';
    });
}


function highlightMoves(square) {  
    // console.log(moves.length);
    let movable;
    for(i=0;i<moves.length;i++){
        movable = document.getElementById(moves[i]);
        if(movable.querySelector('img') !== null){
            if(getColor(movable) != getColor(square)){
                movable.style.filter = "saturate(500%)";
            }
        }
        else{
            movable.style.filter = "saturate(500%)";
        }
    }
}




function getColor(square) {  
    
    return (
        square.querySelector('img').alt.substring(
            square.querySelector('img').alt.indexOf("_")
        )
    );
}


function getPiece(square) {  
    
    return (
        square.querySelector('img').alt.substring(
            0,square.querySelector('img').alt.indexOf("_")
        )
    );
}
