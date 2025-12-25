// LogAggregator - Centralized logging and log aggregation service
class LogAggregator {
    constructor() {
        this.logs = [];
        this.maxLogs = 10000;
    }
    
    log(level, message, metadata = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            ...metadata
        };
        
        this.logs.push(logEntry);
        
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        
        console.log(`[${level}] ${message}`, metadata);
    }
    
    info(message, metadata) {
        this.log('INFO', message, metadata);
    }
    
    error(message, metadata) {
        this.log('ERROR', message, metadata);
    }
    
    warn(message, metadata) {
        this.log('WARN', message, metadata);
    }
    
    getLogs(level = null, limit = 100) {
        let filtered = this.logs;
        if (level) {
            filtered = filtered.filter(log => log.level === level);
        }
        return filtered.slice(-limit);
    }
}

module.exports = LogAggregator;
