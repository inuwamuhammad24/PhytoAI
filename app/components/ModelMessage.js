import React from "react"
import Markdown from "react-markdown"
import TypeIt from "typeit-react"
import SmallLoading from "../../SmallLoading"

export default function ModelMessage(props) {
  return (
    <>
      {props.status == "loading" ? (
        <div className="ai-message">
          <SmallLoading
            width={"30px"}
            height={"30px"}
            border={"2px solid #fff"}
            borderBotton={"2px solid transparent"}
            position={"relative"}
            marginRight={"5px"}
            transform={"none"}
            top={"0"}
            left={"0"}
            message={props.loadingMessage}
          />
        </div>
      ) : (
        <div className="ai-message text-md lg:w-[75%] lg:text-lg w-[95%]">
          <div className="message-logo flex-shrink-0">🌿</div>
          <div className="message-content">
            <TypeIt as="div" options={{ cursor: false, speed: 5 }}>
              <Markdown>{props.message}</Markdown>
            </TypeIt>
          </div>
        </div>
      )}
    </>
  )
}
