
import { fundamentalsModules } from './modules/fundamentals';
import { linuxModules } from './modules/linux';
import { networkingModules } from './modules/networking';
import { gitModules } from './modules/git';
import { deploymentModules } from './modules/deployment';
import { dockerModules } from './modules/docker';
import { cicdModules } from './modules/cicd';
import { cloudModules } from './modules/cloud';
import { iacModules } from './modules/iac';
import { kubernetesModules } from './modules/kubernetes';
import { monitoringModules } from './modules/monitoring';
import { securityModules } from './modules/security';
import { sreModules } from './modules/sre';
import { troubleshootingModules } from './modules/troubleshooting';
import { projectsModules } from './modules/projects';
import { interviewModules } from './modules/interview';

export const devopsModules = [
    ...fundamentalsModules,
    ...linuxModules,
    ...networkingModules,
    ...gitModules,
    ...deploymentModules,
    ...dockerModules,
    ...cicdModules,
    ...cloudModules,
    ...iacModules,
    ...kubernetesModules,
    ...monitoringModules,
    ...securityModules,
    ...sreModules,
    ...troubleshootingModules,
    ...projectsModules,
    ...interviewModules
];
