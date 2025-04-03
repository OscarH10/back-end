const { getCloudflareService } = require('../service-locator/composer');

async function onNewImage(path) {
    const cloudflareService = getCloudflareService();
    const result = await cloudflareService.uploadImages(path);
    return result; // Devuelve el objeto formateado
}

function onRemoveImage(id) {
    const cloudflareService = getCloudflareService(); // Corregido: elimina los paréntesis extra
    return cloudflareService.deleteImages(id); // Corregido: usa el nombre correcto de la función
}

module.exports = {
    onNewImage,
    onRemoveImage
};