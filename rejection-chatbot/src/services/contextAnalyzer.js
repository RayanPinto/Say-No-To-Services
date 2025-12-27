/**
 * Simple context analyzer to extract information from user requests
 */
class ContextAnalyzer {
  /**
   * Analyze user request to extract context
   * @param {string} userRequest - The user's request
   * @returns {object} Context information
   */
  analyze(userRequest) {
    const lowerRequest = userRequest.toLowerCase();
    
    return {
      type: this.detectRequestType(lowerRequest),
      urgency: this.detectUrgency(lowerRequest),
      relationship: this.detectRelationship(lowerRequest),
      tone: this.detectTone(lowerRequest),
      keywords: this.extractKeywords(lowerRequest)
    };
  }

  detectRequestType(request) {
    if (request.includes('meeting') || request.includes('call') || request.includes('zoom')) {
      return 'meeting';
    }
    if (request.includes('help') || request.includes('favor') || request.includes('assist')) {
      return 'favor';
    }
    if (request.includes('party') || request.includes('event') || request.includes('invite')) {
      return 'invitation';
    }
    if (request.includes('work') || request.includes('project') || request.includes('task')) {
      return 'work';
    }
    if (request.includes('money') || request.includes('loan') || request.includes('borrow')) {
      return 'financial';
    }
    return 'general';
  }

  detectUrgency(request) {
    if (request.includes('urgent') || request.includes('asap') || request.includes('immediately')) {
      return 'high';
    }
    if (request.includes('soon') || request.includes('quick')) {
      return 'medium';
    }
    return 'low';
  }

  detectRelationship(request) {
    if (request.includes('boss') || request.includes('manager') || request.includes('supervisor')) {
      return 'professional';
    }
    if (request.includes('friend') || request.includes('buddy') || request.includes('pal')) {
      return 'friendly';
    }
    if (request.includes('family') || request.includes('mom') || request.includes('dad')) {
      return 'family';
    }
    return 'neutral';
  }

  detectTone(request) {
    if (request.includes('please') || request.includes('would you') || request.includes('could you')) {
      return 'polite';
    }
    if (request.includes('need') || request.includes('must') || request.includes('have to')) {
      return 'demanding';
    }
    return 'neutral';
  }

  extractKeywords(request) {
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    const words = request.split(/\s+/).filter(word => 
      word.length > 3 && !commonWords.includes(word.toLowerCase())
    );
    return words.slice(0, 5); // Return top 5 keywords
  }
}

export default ContextAnalyzer;

