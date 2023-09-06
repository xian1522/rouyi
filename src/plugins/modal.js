import { Message } from "element-ui";

export default {
    msg(content) {
        Message.info(content)
    },
    msgSuccess(content) {
        Message.success(content);
    }
}