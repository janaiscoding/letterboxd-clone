import React from "react"
const Story = ({story}) =>{
    return (
        <div className="container">
        <img src={story.img}  alt={story.title} width={352} height={198} className="float-left"/>
        <div> {story.title}</div>
        <p> {story.description}</p>
        </div>
    )
}

export default Story