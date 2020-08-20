

function CreateNode(value){
    
    this.value = value
    this.next = null
    
}
var head = headA = null
const node = function(data){
    
            var newNode = new CreateNode(data)
            if(head === null){
               head = newNode
            }

            else{
                // if(head.next===null){
                //     head.next = newNode
                // }
                    var temp = head

                    while(temp.next!==null){
                        temp = temp.next
                    }

                    temp.next = newNode    
                    }
            return head
}

function insert(data,key){
    let newNode = new CreateNode(data)
    
            if(head === null){
               head = newNode
            }
            else {
                let temp = head;
                let swap;
                while(temp.next!==null && key-1>0){
                    temp = temp.next
                    key--;
                }
                swap = temp.next 
                newNode.next = swap
                temp.next = newNode
                
            }
            return head
}

insert(20,0)
insert(15,1)
const inserted = insert(35,2)

function traversal(inserted){
    var temp = head;
    while(temp!==null){
        console.log(temp.value)
        temp = temp.next
    }
    
}
traversal(inserted)