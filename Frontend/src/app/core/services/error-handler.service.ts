import { ErrorHandler, Injectable, Injector } from '@angular/core'
import { LocationStrategy, PathLocationStrategy } from '@angular/common'
import { LoggingService } from './logging.service'
import * as StackTrace from 'stacktrace-js'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  handleError(error: any) {
    const log = this.injector.get(LoggingService);
    const location = this.injector.get(LocationStrategy) as LocationStrategy
    const message = error.message ? error.message : error.toString()
    const url = location instanceof PathLocationStrategy ? location.path() : ''

    // lets grab the last 20 stacks only
    StackTrace.fromError(error).then(stackframes => {
      const stack = stackframes
        .splice(0, 20)
        .map(sf => sf.toString())
        .join('\n')

        log.error(message)
    }).catch(err => log.error(message))
  }
}