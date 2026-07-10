import { contentState } from '../state';
import { snapshot } from "valtio/vanilla";
import { markPostAsRead } from "../state/contentState";
import { openPreviewModal, closePreviewModal } from "../state";


export const handlePost = (postId) => {
    const { posts } = snapshot(contentState)
    markPostAsRead(postId)
    const post = posts.find(item => item.id === postId)
    closePreviewModal();
    openPreviewModal(post)
}