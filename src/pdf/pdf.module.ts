import { TemplateCompilerService } from '@main-module/pdf/services/compiler-template.service';
import { PdfService } from '@main-module/pdf/services/pdf.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [PdfService, TemplateCompilerService],
  exports: [PdfService, TemplateCompilerService],
})
export class PdfModule {}
