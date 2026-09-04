import { IncidentReport, InKindDonationManifest } from '../types';

const OFFLINE_INCIDENTS_KEY = 'bg_offline_incidents';
const OFFLINE_MANIFESTS_KEY = 'bg_offline_manifests';

export const saveOfflineIncident = (incident: IncidentReport): void => {
  try {
    const existing: IncidentReport[] = JSON.parse(localStorage.getItem(OFFLINE_INCIDENTS_KEY) || '[]');
    existing.push(incident);
    localStorage.setItem(OFFLINE_INCIDENTS_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save offline incident', e);
  }
};

export const getOfflineIncidents = (): IncidentReport[] => {
  try {
    return JSON.parse(localStorage.getItem(OFFLINE_INCIDENTS_KEY) || '[]');
  } catch {
    return [];
  }
};

export const clearOfflineIncidents = (): void => {
  localStorage.removeItem(OFFLINE_INCIDENTS_KEY);
};

export const saveOfflineManifest = (manifest: InKindDonationManifest): void => {
  try {
    const existing: InKindDonationManifest[] = JSON.parse(localStorage.getItem(OFFLINE_MANIFESTS_KEY) || '[]');
    existing.push(manifest);
    localStorage.setItem(OFFLINE_MANIFESTS_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save offline manifest', e);
  }
};

export const getOfflineManifests = (): InKindDonationManifest[] => {
  try {
    return JSON.parse(localStorage.getItem(OFFLINE_MANIFESTS_KEY) || '[]');
  } catch {
    return [];
  }
};

export const clearOfflineManifests = (): void => {
  localStorage.removeItem(OFFLINE_MANIFESTS_KEY);
};
