export function updatePageTitle(page) {
    const [, APP] = document.title.split(' | ');
    document.title = `${page} | ${APP}`;
}
