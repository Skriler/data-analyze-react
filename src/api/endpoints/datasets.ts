import { httpClient } from '@api/client/base';
import { HttpMethod } from '@api/types';
import type { DatasetDto, DatasetCreateDto } from '@api-types/dataset';

export const datasetsApi = {
  BASE_URL: '/datasets',

  /**
   * Get all datasets.
   *
   * @returns Array of DatasetDto.
   */
  async getDatasets(): Promise<DatasetDto[]> {
    return httpClient.request<DatasetDto[], void>({
      method: HttpMethod.GET,
      url: `${this.BASE_URL}`,
      requireAuth: true,
    });
  },

  /**
   * Get dataset by ID.
   *
   * @param id - ID of the dataset.
   * @returns DatasetDto.
   */
  async getDataset(id: number): Promise<DatasetDto> {
    return httpClient.request<DatasetDto, void>({
      method: HttpMethod.GET,
      url: `${this.BASE_URL}/${id}`,
      requireAuth: true,
    });
  },

  /**
   * Create new dataset.
   *
   * @param dataset - Dataset data to create.
   * @returns Created DatasetDto.
   */
  async createDataset(dataset: DatasetCreateDto): Promise<DatasetDto> {
    return httpClient.request<DatasetDto, DatasetCreateDto>({
      method: HttpMethod.POST,
      url: `${this.BASE_URL}`,
      data: dataset,
      requireAuth: true,
    });
  },

  /**
   * Update existing dataset by ID.
   *
   * @param id - ID of the dataset.
   * @param dataset - Dataset data to update.
   * @returns Updated DatasetDto.
   */
  async updateDataset(
    id: number,
    dataset: DatasetCreateDto
  ): Promise<DatasetDto> {
    return httpClient.request<DatasetDto, DatasetCreateDto>({
      method: HttpMethod.PUT,
      url: `${this.BASE_URL}/${id}`,
      data: dataset,
      requireAuth: true,
    });
  },

  /**
   * Delete dataset by ID.
   *
   * @param id - ID of the dataset.
   */
  async deleteDataset(id: number): Promise<void> {
    return httpClient.request<void, void>({
      method: HttpMethod.DELETE,
      url: `${this.BASE_URL}/${id}`,
      requireAuth: true,
    });
  },
};
