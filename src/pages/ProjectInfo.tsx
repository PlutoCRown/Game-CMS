import React from "react";
import LOGO from "@/assets/logo.png";
import { Avatar, Button, Flex, Modal } from "antd";
import { flushSync } from "react-dom";
import { ExportData } from "@/helper/ExportData";
import useExportable from "@/hook/userExportable";

const ProjectInfo = () => {
  const [open, setOpen] = React.useState(false);
  const handleChange = async (state: boolean) => {
    // @ts-ignore
    await document.startViewTransition(() => {
      flushSync(() => setOpen(state));
    }).finished;
  };

  const exportData = useExportable();

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
            <Button onClick={() => ExportData(exportData, 0)}>
              导出数据 (v+debug)
            </Button>
            <Button onClick={() => ExportData(exportData, 1)} type="primary">
              导出数据 (v+Patch)
            </Button>
            <Button onClick={() => ExportData(exportData, 2)}>
              导出数据 (v+Minor)
            </Button>
            <Button onClick={() => ExportData(exportData, 3)}>
              导出数据 (v+Major)
            </Button>
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
