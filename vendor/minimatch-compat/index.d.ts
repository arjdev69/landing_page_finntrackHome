import * as modern from 'minimatch-modern';

declare const minimatch: typeof modern.minimatch & typeof modern;

export = minimatch;
