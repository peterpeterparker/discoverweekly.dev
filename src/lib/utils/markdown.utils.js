import remark from "remark";
import html from "remark-html";

import {JSDOM} from "jsdom";

import {format} from "./format.utils";

export const parse = async (post) => {
    const content = await parseContent(post);

    return {
        ...post,
        content: format(content)
    };
}

export const parseWithSummary = async (post) => {
    const content = await parseContent(post);

    const { window } = new JSDOM(`<!DOCTYPE html>${content}`);

    const title = window.document.querySelector("h1:first-of-type")?.outerHTML;
    const text = window.document.querySelector("p:first-of-type")?.outerHTML;

    return {
        ...post,
        content,
        summary: {
            title,
            text
        }
    };
}

const parseContent = async (post) => {
    const markdown = await remark()
        .use(html)
        .process(post.content || '');
    return markdown.toString();
}
