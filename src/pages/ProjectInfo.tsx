import React from "react";
import LOGO from "@/assets/logo.png";
import { Avatar, Flex, Modal } from "antd";
import { flushSync } from "react-dom";

const ProjectInfo = () => {
  const [open, setOpen] = React.useState(false);
  const handleChange = async (state: boolean) => {
    // @ts-ignore
    await document.startViewTransition(() => {
      flushSync(() => setOpen(state));
    }).finished;
  };
  return (
    <>
      <Modal open={open} title=" " onCancel={() => handleChange(false)}>
        <Flex gap={8} justify="center" align="center">
          <Avatar
            src={LOGO}
            size={200}
            shape="square"
            className="logo"
            onClick={() => handleChange(true)}
            style={{
              viewTransitionName: "logo",
            }}
          />
          <div className="text-span">
            <h3>Project Info</h3>
            <p>
              This is a project to showcase my skills and experience in building
              a web application.
            </p>
          </div>
        </Flex>
      </Modal>
      <Avatar
        src={LOGO}
        size={200}
        className="logo"
        style={{ viewTransitionName: "logo" }}
        onClick={() => handleChange(true)}
      />
    </>
  );
};

export default ProjectInfo;
