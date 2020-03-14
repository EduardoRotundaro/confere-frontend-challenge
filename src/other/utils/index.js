export function updatePageTitle(page) {
    const [, APP] = document.title.split(' | ');
    document.title = `${page} | ${APP}`;
}

export async function isAValidImageURL(url) {
    return new Promise((resolve) => {       
        let img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}
