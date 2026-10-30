// O leitor nativo usa a interface de camera do Google ML Kit (Android).
// A BR e o QR sao conciliados pelo motor do aplicativo; nunca contar o mesmo pacote duas vezes.
import { Capacitor } from '@capacitor/core';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';

if (Capacitor.isNativePlatform()) {
  window.ALTIVNativeScanner = {
    async scanOnce() {
      const support = await BarcodeScanner.isSupported();
      if (!support.supported) throw new Error('A câmera não está disponível neste dispositivo.');
      const module = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      if (!module.available) {
        await BarcodeScanner.installGoogleBarcodeScannerModule();
        throw new Error('Preparando o leitor nativo. Conecte-se à internet uma vez e tente novamente após a instalação.');
      }
      const result = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode, BarcodeFormat.Code128, BarcodeFormat.Code39, BarcodeFormat.Itf],
        autoZoom: true,
      });
      return result.barcodes?.[0]?.rawValue ?? null;
    }
  };
}
