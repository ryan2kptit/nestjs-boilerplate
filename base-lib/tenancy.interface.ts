
/**
 * Tenancy Context interface
 */

export interface ITenancy {
  /**
   * Get the tenant id
   * This method will be called by the lib
   */
  getTenantId(): string;
}
