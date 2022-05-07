import {useState} from "react";
import "./Forum.scss";
import { Input } from 'antd';
import { Button } from 'antd';
import { Avatar } from 'antd';
import { Divider } from 'antd';
import { LikeFilled ,CommentOutlined,SendOutlined ,MessageOutlined} from '@ant-design/icons';
const { TextArea } = Input;

//current user is hello world1


let currentUser = {
  id:1,
  nickName:"hello world1",
  avatar:'/icon/user1.jpeg'
}

let commentsData = [
  {
    id:1,
    content:"like music ,joking :)",
    date:'2022-04-22 00:07:01',
    user:{
      id:1,
      nickName:"hello world1",
      avatar:'/icon/user1.jpeg'
    },
    commentList:[
      {
        id:4,
        content:"me too :)",
        date:'2022-04-22 00:07:02',
        user:{
          id:2,
          nickName:"hello world2",
          avatar:'/icon/user2.jpeg'
        },
        answerList:[
          {
            id:5,
            content:"thanks :)",
            date:'2022-04-22 00:07:02',
            user:{
              id:1,
              nickName:"hello world1",
              avatar:'/icon/user1.jpeg'
            }
          },
        ]
      },
      {
        id:6,
        content:"haha :)",
        date:'2022-04-22 00:07:02',
        user:{
          id:3,
          nickName:"hello world3",
          avatar:'/icon/user3.jpeg'
        }
      }
    ]
  },{
    id:2,
    content:"like music ,joking :)",
    date:'2022-04-22 00:07:01',
    user:{
      id:1,
      nickName:"hello world1",
      avatar:'/icon/user1.jpeg'
    },
    commentList:[
      {
        id:7,
        content:"me too :)",
        date:'2022-04-22 00:07:02',
        user:{
          id:2,
          nickName:"hello world2",
          avatar:'/icon/user2.jpeg'
        }
      },
      {
        id:8,
        content:"wawa :)",
        date:'2022-04-22 00:07:02',
        user:{
          id:3,
          nickName:"hello world3",
          avatar:'/icon/user3.jpeg'
        }
      }
    ]
  },
  {
    id:3,
    content:"lala la ..la la la:)",
    date:'2022-04-22 00:07:01',
    user:{
      id:2,
      nickName:"hello world2",
      avatar:'/icon/user2.jpeg'
    },
    commentList:[
      {
        id:9,
        content:"haha :)",
        date:'2022-04-22 00:07:02',
        user:{
          id:3,
          nickName:"hello world3",
          avatar:'/icon/user3.jpeg'
        },
        answerList:[
          {
            id:10,
            content:"thanks :)",
            date:'2022-04-22 00:07:02',
            user:{
              id:2,
              nickName:"hello world2",
              avatar:'/icon/user2.jpeg'
            },
           },
            {
              id:11,
              content:"thanks :)",
              date:'2022-04-22 00:07:02',
              user:{
                id:2,
                nickName:"hello world2",
                avatar:'/icon/user2.jpeg'
             }
          }
        ]
      }
    ]
  }

]

const formateDate = function (date){
  if(!date){
    date = new Date();
  }
  return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate())+" " +
        date.getHours() +":" + date.getMinutes()+":"+date.getSeconds();
}

function Forum(props){
  const {} = props
  let lcomments = localStorage.getItem("comments");
  if(lcomments){
    commentsData =JSON.parse(lcomments);
  }
  const [comments,setComments] = useState(commentsData)

  const [commentRefs,setCommentRefs] = useState({})

  function answerComment(commentId,commentId2,message){
      console.log(commentId,commentId2,message);
      for(let i = 0 ; i < comments.length ; i ++){
        if(comments[i].id == commentId){
          console.log(comments[i])
          if( comments[i].commentList){
            for(let j = 0 ; j < comments[i].commentList.length ; j ++){
                if(comments[i].commentList[j].id == commentId2){
                  console.log(comments[i].commentList[j])
                  if(!comments[i].commentList[j].answerList){
                    comments[i].commentList[j].answerList = [];
                  }
                  comments[i].commentList[j].answerList.push({
                    id:new Date().getTime(),
                    content:message,
                    date:formateDate(),
                    user:currentUser
                  })
                  setComments(JSON.parse(JSON.stringify(comments)));
                  localStorage.setItem("comments",JSON.stringify(comments))
                  setTimeout(function(){
                    document.querySelector('#id'+commentId+commentId2).value= "";
                    commentRefs["_dt"+commentId2+"input"].resizableTextArea.textArea.value = "";
                    setCommentRefs(commentRefs)
                  },500)
                  commentRefs["_dt"+commentId2+"toggle"] = 0;
                  commentRefs["docomment"+commentId2].style.display="none";
                }
            }
          }
        }
      }
  }

  function answerComment0(commentId,message){
    for(let i = 0 ; i < comments.length ; i ++){
      if(comments[i].id == commentId){
        if(!comments[i].commentList){
          comments[i].commentList = [];
        }
        comments[i].commentList.push({
          id:new Date().getTime(),
          content:message,
          date:formateDate(),
          user:currentUser
        });
        setComments(JSON.parse(JSON.stringify(comments)));
        localStorage.setItem("comments",JSON.stringify(comments))
        setTimeout(function(){
          document.querySelector('#id'+commentId+"_input").value= "";
          commentRefs["o_dt"+commentId+"_input"].resizableTextArea.textArea.value = "";
          setCommentRefs(commentRefs);
        },500)
      }
    }
  }

  function addComment(message){
    if(!comments){
      comments = [];
    }
    comments.push({
      id:new Date().getTime(),
      content:message,
      date:formateDate(),
      user:currentUser
    });
    setComments(JSON.parse(JSON.stringify(comments)));
    localStorage.setItem("comments",JSON.stringify(comments))
    setTimeout(function(){
      document.querySelector("#topInput").value= "";
      commentRefs["topInput"].resizableTextArea.textArea.value = "";
      setCommentRefs(commentRefs)
    },500)
  }

  function doLike(commentId){
    for(let i = 0 ; i < comments.length ; i ++){
      if(comments[i].id == commentId){
        if(!comments[i].likeList){
          comments[i].likeList = [];
        }
        let haveLiked = false;
        let newLikeList = []
        comments[i].likeList.forEach((item,index)=>{
          if(item.id == currentUser.id){
            haveLiked = true;
          }else{
            newLikeList.push(item)
          }
        })
        if(!haveLiked){
          commentRefs["otd"+commentId+"like"].style.color='rgb(255,0,0)';
          comments[i].likeList.push(currentUser)
          setComments(JSON.parse(JSON.stringify(comments)));
          localStorage.setItem("comments",JSON.stringify(comments))
        }else{
            commentRefs["otd"+commentId+"like"].style.color='#888';
          comments[i].likeList =newLikeList;
        }
      }
    }
  }
  function checkUserLike(userList,currentUser){
    if(userList){
      for(let i = 0 ; i < userList.length; i ++){
        if(userList[i].id == userList.id){
          return true;
        }
      }
    }
    return false;
  }
  return(
      <div className = "outbg">
      <div className="content">
        <div className="commentOp">
          <div className="title">
            <div>
              Comments
            </div>
            <div>
              Total {comments.length} comments
            </div>
          </div>
          <Divider style={{margin:"0 0 0.5em 0"}}/>
          <div className="textArea">
              <CommentOutlined  style={{fontSize:"2em",color:'#666'}} />
              <TextArea rows={2}
                id = {"topInput"}
               ref={
                 (node)=>{
                   if(node){
                     commentRefs["topInput"] = node;
                     commentRefs["topInput"].resizableTextArea.textArea.value = "";
                     setCommentRefs(commentRefs)
                   }
                 }
               }
               placeholder="pls talking something!" maxLength={255} />
          </div>
          <div className ="butarea" >
             <Button type="primary"
             onClick={(event)=>{
               let message = commentRefs["topInput"].resizableTextArea.textArea.value;
               if(!message){
                 return;
               }
               addComment(message);
             }}
             style={{color:"white",borderColor:"#C20C0C",backgroundColor:"#C20C0C"}}>submit</Button>
          </div>
        </div>

        <div className="commentArea">
          {
            comments?.sort((d2,d1)=>{
              if(new Date(d2.date) > new Date(d1.date)){
                return -1;
              }
              if(new Date(d2.date) == new Date(d1.date)){
                return 0;
              }
              if(new Date(d2.date) > new Date(d1.date)){
                return 1;
              }
            }).map((comment,index)=>{
              let comment1 =comment;
              return (
                  <div key={index} className="itemComment">
                    <div className="commentAreaUser">
                      <div>
                        <Avatar shape="circle" size={64} src={process.env.PUBLIC_URL + comment.user.avatar} />
                      </div>
                      <div>
                        <div> <h3 className="nickName">{comment.user.nickName}</h3></div>
                        <div><span className="date">{comment.date}</span></div>
                      </div>
                    </div>
                    <div className="commentContent">
                      <p>
                        {comment.content}
                      </p>
                    </div>
                    <div className="commentOpInner">
                      <div className="item like">
                        <LikeFilled
                        ref={
                          (node)=>{
                            commentRefs["otd"+comment.id+"like"] = node;
                            setCommentRefs(commentRefs)
                          }
                        }
                        style={
                          {
                            color:checkUserLike(comment.likeList,currentUser)?'rgb(255,0,0)':'#888'
                          }
                        }
                        onClick={
                          (event)=>{

                            doLike(comment.id)
                          }
                        }
                        />
                      </div>
                    </div>
                    <Divider style={{margin:'0'}}/>
                    <div className="commentToComment">
                      {
                        comment.commentList?.map((comment,index2)=>{
                          let comment2 =comment;
                          return (
                            <div key={index+"-"+index2}>
                              <div className="commentAreaUser">
                                <div>
                                  <Avatar shape="circle" size={23} src={process.env.PUBLIC_URL + comment.user.avatar} />
                                </div>
                                <div>
                                  <div className="reply">
                                      <h3 className="nickName">{comment.user.nickName}</h3>
                                      <span
                                       onMouseOver={()=>{
                                         commentRefs["anser"+comment.id].style.display='inline-block'
                                       }}
                                       onMouseOut={()=>{
                                         commentRefs["anser"+comment.id].style.display='none'
                                       }}
                                       onClick={()=>{
                                         for(let prop in commentRefs){
                                           if(prop.indexOf("docomment") !== -1){
                                             commentRefs[prop].style.display = 'none'
                                           }
                                         }
                                         console.log(commentRefs["_docomment"+comment.id+"toggle"])
                                         if(commentRefs["_dt"+comment.id+"toggle"] ==0){
                                           commentRefs["_dt"+comment.id+"toggle"] =1;
                                            commentRefs["docomment"+comment.id].style.display='flex';
                                         }else{
                                           commentRefs["_dt"+comment.id+"toggle"] = 0;
                                            commentRefs["docomment"+comment.id].style.display='none';
                                         }
                                         //console.log(commentRefs["_dt"+comment.id+"input"]);
                                         commentRefs["_dt"+comment.id+"input"].resizableTextArea.textArea.value=""
                                         commentRefs["_dt"+comment.id+"input"].focus();
                                         setCommentRefs(commentRefs)
                                      }}>
                                        <span className="an" ref={(node)=>{
                                          if(node){
                                            commentRefs["anser"+comment.id] = node;

                                            setCommentRefs(commentRefs)
                                          }
                                        }} style={{display:"none"}}>回复</span>
                                        <MessageOutlined style={{}}

                                        />
                                      </span>
                                  </div>
                                  <div><span className="date">{comment.date}</span></div>
                                </div>
                              </div>
                              <div className="commentContent">
                                <p>
                                  {comment.content}
                                </p>

                              </div>
                              <div className="continueComment"
                              ref={(node)=>{
                                if(node){
                                  commentRefs["_dt"+comment.id+"toggle"] = 0;
                                  commentRefs["docomment"+comment.id] = node;
                                  setCommentRefs(commentRefs)
                                }
                              }}
                               style={{paddingRight:'2em',paddingLeft:'2em',paddingBottom:'0.8em',display:'none'}}>
                                <TextArea
                                id={"id"+comment1.id+comment2.id}
                                ref = {
                                  (node)=>{
                                      commentRefs["_dt"+comment.id+"input"] = node;
                                      setCommentRefs(commentRefs)
                                  }
                                }
                                rows={1} placeholder="continues..." maxLength={255} />
                                <SendOutlined
                                onClick={()=>{
                                  let message = commentRefs["_dt"+comment.id+"input"].resizableTextArea.textArea.value;
                                  if(!message){
                                    return;
                                  }
                                  answerComment(comment1.id,comment.id,message);
                                }}
                                style={{fontSize:'1.5em', color:"#C20C0C",cursor:"pointer"}} />
                              </div>
                              <div className="answerArea">
                              {
                                comment.answerList?.map((comment,index3)=>{
                                    return <div  key={index+"-"+index2+"-"+index3}>
                                    <div className="commentAreaUser">
                                      <div>
                                        <Avatar shape="circle" size={23} src={process.env.PUBLIC_URL + comment.user.avatar} />
                                      </div>
                                      <div>
                                        <div> <h3 className="nickName">{comment.user.nickName}</h3></div>
                                        <div><span className="date">{comment.date}</span></div>
                                      </div>
                                    </div>
                                    <div className="commentContent">
                                      <p>
                                        {comment.content}
                                      </p>
                                    </div>
                                  </div>
                                })
                              }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="continueComment">
                      <TextArea rows={1}
                      id={"id"+comment.id+"_input"}
                      ref={
                        (node)=>{
                          if(node){
                            commentRefs["o_dt"+comment.id+"_input"] = node;
                            commentRefs["o_dt"+comment.id+"_input"].resizableTextArea.textArea.value=""
                            setCommentRefs(commentRefs)
                          }
                        }
                      }
                       placeholder="continues..." maxLength={255} />
                      <SendOutlined
                        onClick={
                          ()=>{
                            let message = commentRefs["o_dt"+comment.id+"_input"].resizableTextArea.textArea.value;
                            if(!message){
                              return;
                            }
                            answerComment0(comment.id,message)
                          }
                        }
                      style={{color:"#C20C0C",cursor:"pointer"}} />
                    </div>
                  </div>
              );
            })
          }
        </div>
      </div>
      </div>
  );
}
export default Forum;
