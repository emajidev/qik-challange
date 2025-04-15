import { PageOptionsDto } from "src/core/dtos";

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  total_elements: number;
  page_size: number;
}
