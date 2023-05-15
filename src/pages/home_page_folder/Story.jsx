import React from "react"
const Story = ({story}) =>{
    return (
        <div>
        <img src={story.img}  alt={story.title} width={352} height={198}/>
        <div> {story.title}</div>
        <p> {story.description}</p>
        </div>
    )
}

export default Story